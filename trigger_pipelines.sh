#!/bin/bash -xe

for pipeline in $PROVIDER_PIPELINES; do
  aws codepipeline start-pipeline-execution --name $pipeline
done
