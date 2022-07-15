# Get github action current job id

---

GitHub official has not provide access to the job id by using existing API. 

This tool could help you to get job id easier. 

# Usage

---

### Pre-requisites

Create a workflow `*.yml` file in your repositories `.github/workflows` directory.

### Example-1 Get a single job id

```yaml
jobs:
  get-job-id: 
    runs-on: ubuntu-latest
    name: SET-A-NEW-NAME # change SET-A-NEW-NAME
    steps:
    - name: set id
      id: set-job-id
      uses: ayachensiyuan/get-action-job-id@v1.4
      env: 
    	  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        job-name: SET-A-NEW-NAME # same as name

    # get id     
    - name: get id
      run: echo "The current job id is ${{ steps.set-job-id.outputs.jobId }}"


```
### Example-2 Get bulk of job-ids

```yaml
jobs:
  get-job-id: 
    runs-on: ubuntu-latest
    strategy:
      matrix:
        cases: ['case1', 'case2', 'case3', 'case4']
    name: ${{ matrix.cases }} # change SET-A-NEW-NAME
    steps:
    - name: set id
      id: set-job-id
      uses: ayachensiyuan/get-action-job-id@v1.4
      env: 
    	  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        job-name: ${{ matrix.cases }} # same as name

    # get id     
    - name: get id
      run: echo "The current job id is ${{ steps.set-job-id.outputs.jobId }}"

```




# License

---

The scripts and documentation in this project are released under the [MIT License](https://github.com/actions/upload-artifact/blob/main/LICENSE).