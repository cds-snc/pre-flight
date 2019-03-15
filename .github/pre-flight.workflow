workflow "Pre-flight checks" {
  on = "push"
  resolves = ["docker://alpine:3.9.2"]
}

action "docker://alpine:3.9.2" {
  uses = "docker://alpine:3.9.2"
  args = "[ -f /github/workspace/LICENSE.md ] && exit 0 || exit 1"
}
