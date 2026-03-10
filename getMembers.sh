#!/usr/bin/env sh

set -eu

# Directory of this script (POSIX-safe)
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

ORG_NAME="TandemIT"
MEMBERS_DIR="src/lib/api/members"
LIST_FILE="src/lib/api/listMembers.json"
SUMMARY_FILE="src/lib/api/summaryReport.json"

mkdir -p "$MEMBERS_DIR"

if [ -z "${GITHUB_TOKEN-}" ]; then
    echo "No GitHub token supplied. Proceeding without authentication."
    USE_AUTH=0
else
    echo "GitHub token supplied. Using authentication."
    USE_AUTH=1
fi

fetch_json() {
    url=$1
    output=$2

    if [ "$USE_AUTH" -eq 1 ]; then
        curl -H "Authorization: token $GITHUB_TOKEN" "$url" -o "$output"
    else
        curl "$url" -o "$output"
    fi
}

# Get the member list
fetch_json "https://api.github.com/orgs/$ORG_NAME/members" "$LIST_FILE"

# Iterate over each member to get detailed information
jq -r '.[].login' "$LIST_FILE" | while IFS= read -r login; do
    tmp_file="$MEMBERS_DIR/$login.json.tmp"
    out_file="$MEMBERS_DIR/$login.json"

    fetch_json "https://api.github.com/users/$login" "$tmp_file"

    # Encode sensitive data in the individual member file
    jq 'if .blog then .blog |= sub("o"; "&#111;") else . end' "$tmp_file" > "$out_file"
    rm -f -- "$tmp_file"
    sleep 1
done

# Generate a summary report
set -- "$MEMBERS_DIR"/*.json
if [ -e "$1" ]; then
    echo "[" > "$SUMMARY_FILE"
    first=true

    for file; do
        if [ "$first" = true ]; then
            first=false
        else
            echo "," >> "$SUMMARY_FILE"
        fi

        # Encode sensitive data (blog URLs) with HTML entities to prevent scraping
        jq '{
            login,
            id,
            avatar_url,
            html_url,
            name,
            company,
            blog: (.blog | if . then sub("o"; "&#111;") else . end),
            location,
            public_repos,
            followers,
            following
        }' "$file" >> "$SUMMARY_FILE"
    done

    echo "]" >> "$SUMMARY_FILE"
else
    echo "[]" > "$SUMMARY_FILE"
fi