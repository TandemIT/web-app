#!/bin/bash

# Directory of the script
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

# Organization name (replace with your organization)
ORG_NAME="TandemIT"

# Create a directory to store the list and detailed member information
mkdir -p src/lib/api/members

# Check if the GITHUB_TOKEN environment variable is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "No GitHub token supplied. Proceeding without authentication."
    AUTH=""
else
    echo "GitHub token supplied. Using authentication."
    AUTH="-H \"Authorization: token $GITHUB_TOKEN\""
fi

# Get the member list
eval "curl $AUTH https://api.github.com/orgs/$ORG_NAME/members -o src/lib/api/listMembers.json"

# Iterate over each member to get detailed information
jq -r '.[].login' src/lib/api/listMembers.json | while read login; do
    eval "curl $AUTH https://api.github.com/users/$login -o src/lib/api/members/$login.json.tmp"
    # Encode sensitive data in the individual member file
    jq 'if .blog then .blog |= sub("o"; "&#111;") else . end' "src/lib/api/members/$login.json.tmp" > "src/lib/api/members/$login.json"
    rm "src/lib/api/members/$login.json.tmp"
    sleep 1  # Add a delay to avoid hitting the rate limit
done

# Generate a summary report
if [ -d "src/lib/api/members" ] && [ "$(ls -A src/lib/api/members/*.json 2>/dev/null)" ]; then
    echo "[" > src/lib/api/summaryReport.json
    first=true
    for file in src/lib/api/members/*.json; do
        if [ "$first" = true ]; then
            first=false
        else
            echo "," >> src/lib/api/summaryReport.json
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
        }' "$file" >> src/lib/api/summaryReport.json
    done
    echo "]" >> src/lib/api/summaryReport.json
else
    echo "[]" > src/lib/api/summaryReport.json
fi