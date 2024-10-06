#!/bin/bash
cd "$(dirname $(dirname "$0"))"
export $(cat .env | grep -v ^# | xargs) >/dev/null
scp .env.production ${USER}@${HOST}:/root/${APP}