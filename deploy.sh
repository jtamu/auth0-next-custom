#!/bin/bash

# Amplifyアプリのパラメータを設定
APP_ID="d2ii8dlssorfy8"
BRANCH_NAME="main"
JOB_TYPE="RELEASE"

# デプロイジョブを開始
JOB_ID=$(aws amplify start-job --app-id $APP_ID --branch-name $BRANCH_NAME --job-type $JOB_TYPE --query 'jobSummary.jobId' --output text)

echo "Started job with ID: $JOB_ID"

# ジョブの状態を監視
while true; do
  JOB_STATUS=$(aws amplify get-job --app-id $APP_ID --branch-name $BRANCH_NAME --job-id $JOB_ID --query 'job.summary.status' --output text)

  echo "Current job status: $JOB_STATUS"

  if [ "$JOB_STATUS" == "SUCCEED" ]; then
    echo "Job completed successfully"
    break
  elif [ "$JOB_STATUS" == "FAILED" ]; then
    echo "Job failed"
    exit 1
  fi

  sleep 10
done
