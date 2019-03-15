workflow "Pre-flight checks" {
  on = "push"
  resolves = ["docker://alpine:3.9.2"]
}

action "docker://alpine:3.9.2" {
  uses = "docker://alpine:3.9.2"
  args = "sh -c \"if [ -e /github/workspace/LICENSE.md ]; then exit 0; else exit 1; fi\""
}
