#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd $DIR

# Get the member list

curl https://api.github.com/orgs/tandemit/members -o src/lib/listMembers.json

# Get list contents

