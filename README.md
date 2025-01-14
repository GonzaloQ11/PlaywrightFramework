# Playwright Framework

## Description
Playwright automation tests created for a demo site: https://opensource-demo.orangehrmlive.com/

## Environment

| **NAME**       | **DESCRIPTION**                  |
|-----------------|----------------------------------|
| APP_USERNAME    | The username for the demo account. |
| APP_PASSWORD    | The password for the demo account. |

## Prerequisites

- Node.js (v14 or higher)
- npm
- Docker (optional, for running tests with Docker)

## Setup

### Clone .env.example

``` bash
cp .env.example .env
```
### Installation

``` bash
npm install
```

## Run Tests
``` bash
npx playwright test
```

## Run Tests with Docker
``` bash
docker compose run test
```
