#!/usr/bin/env bash

set -o errexit

bundle install
npm install
bin/rails db:migrate
npm run build
