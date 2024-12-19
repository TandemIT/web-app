#!/bin/bash

# Directory of the script
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd $DIR

# Organization name (replace with your organization)
ORG_NAME="tandemit"

# Create a directory to store the list and detailed member information
mkdir -p src/lib/api/members

# Check if the GITHUB_TOKEN environment variable is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "No GitHub token supplied. Proceeding without authentication."
    AUTH_HEADER=""
else
    echo "GitHub token supplied. Using authentication."
    AUTH_HEADER="-H \"Authorization: token $GITHUB_TOKEN\""
fi

# Get the member list
eval curl $AUTH_HEADER https://api.github.com/orgs/$ORG_NAME/members -o src/lib/api/listMembers.json

# Iterate over each member to get detailed information
jq -r '.[].login' src/lib/api/listMembers.json | while read login; do
    eval curl $AUTH_HEADER https://api.github.com/users/$login -o src/lib/api/members/$login.json
    sleep 1  # Add a delay to avoid hitting the rate limit
done

# Generate a summary report
echo "[" > src/lib/api/summaryReport.json
first=true
for file in src/lib/api/members/*.json; do
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> src/lib/api/summaryReport.json
    fi
    jq '{login, id, avatar_url, html_url, name, company, blog, location, public_repos, followers, following}' $file >> src/lib/api/summaryReport.json
done
echo "]" >> src/lib/api/summaryReport.json