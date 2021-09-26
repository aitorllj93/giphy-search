declare const process: Process;

interface Process {
  env: Env;
}

type Env = Record<string, string | undefined>;

interface GlobalEnvironment {
  process: Process;
}
