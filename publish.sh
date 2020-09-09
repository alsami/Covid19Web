#!/usr/bin/env bash
function build_app() {
    echo build application in production mode, this might take a while
    ng build --prod --output-hashing bundles
    return ${?}
}

function create_image() {
    docker build -t ${REGISTRY}/covid-19-statistics:${TRAVIS_TAG} -f ./Dockerfile .
    return ${?}
}

function publish_image() {
    docker push ${REGISTRY}/covid-19-statistics:${TRAVIS_TAG}
    return ${?};
}

function authenticate() {
    echo authenticating with service-principal
    az login --service-principal -u ${SERVICE_PRINCIPAL_USER} -p ${SERVICE_PRINCIPAL_PASSWORD} --tenant ${SERVICE_PRINCIPAL_TENANT}
}


function set_container() {
    echo updating container to version ${TRAVIS_TAG}
    az webapp config container set -c "${REGISTRY}/covid-19-statistics:${TRAVIS_TAG}" -r https://${REGISTRY} -u ${REGISTRY_USER} -p "${REGISTRY_PASSWORD}" -n ${COVID19STATISTICS_SERVICE_NAME} -g ${COVID19STATISTICS_RESOURCE_NAME}
}

function restart_app() {
    echo restarting application
    az webapp restart --name ${COVID19STATISTICS_SERVICE_NAME} --resource-group ${COVID19STATISTICS_RESOURCE_NAME}
}

build_app
create_image
publish_image
authenticate
set_container
restart_app


