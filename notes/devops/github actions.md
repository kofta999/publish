2025-04-18 13:48
Tags:
##### Content
It's a platform to automate developer workflows that includes CI/CD and more

### How it works
1. Event happens: which is when something happens IN or TO our repository
	Examples Include:
	- PR Created
	- Contributor Joined
	- Issue Created
	- PR Merged
	- Other Apps's events
2. Then a series of automatic actions are executed in response (a workflow)

GitHub Actions are easier to setup than other CI/CD tools (more developer friendly)

### Syntax
```yaml
name: description # Optional, describes the workflow

# Required, the event to trigger on
on:
	push / pull_request / schedule: # And more
		# List of branches to trigger on
		branches:
		# List of paths to only trigger workflow on
		paths:
		# List of paths to not trigger the workflow on
		# (e.g. don't trigger on docs change)
		paths-ignore: 

jobs: # One or more actions
	build: # Any name, a job is a sequence of tasks (steps)
		runs-on: ubuntu-latest # Server type (ubuntu / windows / mac)
		
		# if you want to run on multiple OSes
		runs-on: ${{matrix.os}}
		strategy:
			matrix:
				os: [ubuntu-latest, windows-latest, macOS-latest]
		
		
		steps: # A list of tasks
			- uses: actions/checkout@v2 # Premade action in github.com/actions
			
			- name: test # You can set names to tasks
			  uses: actions/xx
			  with: # action settings
				key: value
				secret: ${{secrets.USERNAME}} # Available in GitHub repo settings
			
			- name: test2
			  run: chmod +x script.sh # Run shell commands
			
			- name: publish to docker
			  run: | # Use pipe operator for multi-line commands
			    docker login 
			    docker push

	publish:
		# To disable parallel exec if a job depends on the output of other
		needs: build
```

### Runner Environment
- Workflows run in a GitHub Actions Runner, VMs managed by GitHub
- You can host your own runner too
- Each **job** in a workflow runs in a fresh, virtual environment
- And jobs runs in parallel by default

**Note:** If you're planning to use Docker, Ubuntu has it pre-installed.
##### References
https://www.youtube.com/watch?v=R8_veQiYBjI