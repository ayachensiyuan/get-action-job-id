# Get github action current job id

---

This tool help you to get job id easier. 

# Usage

---

### Pre-requisites

Create a workflow `*.yml` file in your repositories `.github/workflows` directory.

### Example

```yaml
  steps:
  - name: set id
    id: setId
    uses: ayachensiyuan/get-action-job-id@v1.1
    env: 
    	GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      run-id: ${{ github.run_id }}
      run-attempt: ${{ github.run_attempt }}
  
  # get id     
  - name: get id
    run: echo "The current job id is ${{ steps.setId.outputs.jobId }}"


```

GitHub official has not provide access to the job id by using exist API. 



# License

---

The scripts and documentation in this project are released under the [MIT License](https://github.com/actions/upload-artifact/blob/main/LICENSE).