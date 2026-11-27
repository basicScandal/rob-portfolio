export type EntryKind = "goal" | "fact" | "intent" | "hint";

export type Status =
  | "open"
  | "met"
  | "recorded"
  | "negative"
  | "reported"
  | "verified"
  | "pending"
  | "running"
  | "held"
  | "done"
  | "dropped"
  | "hint";

export interface TraceEntry {
  id: string;
  kind: EntryKind;
  /** Two or three words shown under the node. */
  short: string;
  /** The entry as written on the board. */
  text: string;
  /** Who writes it. */
  by: string;
  /** Older entries this one cites or was produced by. */
  from: string[];
  x: number;
  y: number;
}

export interface TraceStep {
  title: string;
  text: string;
  add?: string[];
  set?: Record<string, Status>;
}

export interface Trace {
  id: string;
  entries: TraceEntry[];
  steps: TraceStep[];
}

export const castleTrace: Trace = {
  id: "castle",
  entries: [
    { id: "G", kind: "goal", short: "the treasure", text: "Find the treasure.", by: "Team leader", from: ["f4"], x: 650, y: 180 },
    { id: "i1", kind: "intent", short: "kitchen, pantry", text: "Search the kitchen and the pantry.", by: "Team leader", from: [], x: 70, y: 70 },
    { id: "i2", kind: "intent", short: "library", text: "Search the library.", by: "Team leader", from: [], x: 70, y: 180 },
    { id: "i3", kind: "intent", short: "tower", text: "Search the tower.", by: "Team leader", from: [], x: 70, y: 290 },
    { id: "f1", kind: "fact", short: "pantry is empty", text: "We searched the kitchen. There is nothing in the pantry.", by: "Explorer A", from: ["i1"], x: 200, y: 70 },
    { id: "f2", kind: "fact", short: "a key", text: "There is a key in the library.", by: "Explorer B", from: ["i2"], x: 200, y: 180 },
    { id: "f3", kind: "fact", short: "a locked door", text: "There is a locked door in the tower.", by: "Explorer C", from: ["i3"], x: 200, y: 290 },
    { id: "i4", kind: "intent", short: "key + door", text: "Does the key open that door?", by: "Team leader", from: ["f2", "f3"], x: 370, y: 235 },
    { id: "f4", kind: "fact", short: "treasure room", text: "The key opens the tower door. The treasure is behind it.", by: "Explorer A", from: ["i4"], x: 510, y: 235 },
  ],
  steps: [
    {
      title: "A treasure, and no route",
      text: "You know that the treasure exists. You do not know which room holds it or how to get there. The notebook holds the goal, so the goal stays after each explorer leaves.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "The team leader sends three explorers",
      text: "The team leader reads the notebook and decides where each explorer goes next. Nobody needs to know the full route at the start.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "Each explorer writes in the same notebook",
      text: "The empty pantry is a useful note, because nobody searches the pantry again. Two different explorers find the key and the locked door. Each discovery alone has little value.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "negative", f2: "recorded", f3: "recorded" },
    },
    {
      title: "Two notes make one question",
      text: "The team leader reads the two notes together and writes one question. One explorer's discovery makes another explorer's discovery useful.",
      add: ["i4"],
      set: { i4: "running" },
    },
    {
      title: "A different explorer answers the question",
      text: "Explorer A did not go to the library or to the tower. The notebook tells Explorer A to get the key and to try the door.",
      add: ["f4"],
      set: { i4: "done", f4: "reported" },
    },
    {
      title: "The expedition finds the treasure",
      text: "A second explorer examines the claim before the expedition stops. An explorer can get tired or leave, and the expedition still keeps what it learned.",
      set: { f2: "verified", f3: "verified", f4: "verified", G: "met" },
    },
  ],
};

export const offenseTrace: Trace = {
  id: "offense",
  entries: [
    { id: "G", kind: "goal", short: "code execution", text: "Show code execution on a host in *.company.com. Actions are read-only by default. Do not access data. Leave nothing persistent. Each state-changing action needs approval.", by: "Operator", from: ["f6"], x: 665, y: 185 },
    { id: "i1", kind: "intent", short: "list hosts", text: "Which hosts exist under *.company.com?", by: "Planner", from: [], x: 55, y: 75 },
    { id: "i2", kind: "intent", short: "public leaks", text: "Do public sources hold credentials for company accounts?", by: "Planner", from: [], x: 55, y: 185 },
    { id: "i3", kind: "intent", short: "main app inputs", text: "Do the inputs of the main application show a flaw?", by: "Planner", from: [], x: 55, y: 295 },
    { id: "f1", kind: "fact", short: "leaked account", text: "A company account appears in a public leak.", by: "Worker", from: ["i2"], x: 170, y: 185 },
    { id: "f2", kind: "fact", short: "admin portal", text: "An unlisted host has an admin portal.", by: "Worker", from: ["i1"], x: 170, y: 75 },
    { id: "f3", kind: "fact", short: "inputs clean", text: "The inputs of the main application are clean under the stated test conditions.", by: "Worker", from: ["i3"], x: 170, y: 295 },
    { id: "i4", kind: "intent", short: "examine portal", text: "What does the admin portal expose?", by: "Planner", from: ["f2"], x: 290, y: 40 },
    { id: "i5", kind: "intent", short: "default logins", text: "Does the portal accept default logins?", by: "Planner", from: ["f2"], x: 290, y: 125 },
    { id: "f4", kind: "fact", short: "upload feature", text: "The portal has an upload feature behind its sign-in.", by: "Worker", from: ["i4"], x: 400, y: 105 },
    { id: "f5", kind: "fact", short: "company sign-in", text: "The portal signs in ordinary company accounts.", by: "Worker", from: ["i4"], x: 410, y: 30 },
    { id: "i6", kind: "intent", short: "account + upload", text: "Does the leaked account open the portal, and does its upload feature lead to code execution?", by: "Planner", from: ["f1", "f4", "h1"], x: 500, y: 185 },
    { id: "h1", kind: "hint", short: "marker only", text: "Approved. Use the marker command only. Do not open a shell.", by: "Operator", from: [], x: 400, y: 270 },
    { id: "f6", kind: "fact", short: "marker ran", text: "The marker command ran on the portal host. The board stores the request and the response.", by: "Worker", from: ["i6"], x: 585, y: 185 },
  ],
  steps: [
    {
      title: "A known start, a known end, no path",
      text: "The board holds the goal and the rules of engagement. The goal does not name the host, the service or the flaw.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "The planner proposes three intents",
      text: "The planner does not touch the target. The dispatcher gives each intent to a free worker. The three intents are read-only, so they run at the same time.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "Three facts, and one is negative",
      text: "Fact f3 says that the inputs of the main application are clean. The planner does not return to them. Facts f1 and f2 each look minor.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "recorded", f2: "recorded", f3: "negative" },
    },
    {
      title: "One fact motivates two intents",
      text: "Nobody knew about the portal at the start. Thus the system could not plan this work at the start.",
      add: ["i4", "i5"],
      set: { i4: "running", i5: "pending" },
    },
    {
      title: "A worker examines the portal",
      text: "The worker records two facts. A different session found the leaked account (f1), and that fact is in a different branch of the graph.",
      add: ["f4", "f5"],
      set: { i4: "done", f4: "recorded", f5: "recorded" },
    },
    {
      title: "Two branches converge",
      text: "Intent i6 joins the leaked account (f1) and the upload feature (f4). Neither fact is a finding alone. Fact f5 made the default-logins idea (i5) unnecessary. The planner drops i5 with a reason and keeps the record.",
      add: ["i6"],
      set: { i5: "dropped", i6: "pending" },
    },
    {
      title: "The guard holds the intent for a human",
      text: "Intent i6 changes state on the target, so code outside the model stops it. The operator approves it with written conditions. The approval is one more entry on the board.",
      add: ["h1"],
      set: { i6: "held", h1: "hint" },
    },
    {
      title: "The worker runs one harmless command",
      text: "The worker runs the marker command only. The board records the result as reported. The result is a claim with an artifact, and it is not verified.",
      add: ["f6"],
      set: { i6: "done", f6: "reported" },
    },
    {
      title: "Separate sessions replay the evidence",
      text: "The verifier sessions do not see the reasoning of the first worker. They reproduce each fact on the path from its stored artifact.",
      set: { f1: "verified", f2: "verified", f4: "verified", f6: "verified" },
    },
    {
      title: "The goal is met on verified evidence",
      text: "The goal predicate holds on verified facts. The run stops and reports the reason. A single agent can do each of these steps, but it must hold f1 in its context until it needs the fact.",
      set: { G: "met" },
    },
  ],
};

export const defenseTrace: Trace = {
  id: "defense",
  entries: [
    { id: "G", kind: "goal", short: "the answer", text: "Did the intruder reach the customer database, and how far did the intruder get?", by: "Incident lead", from: ["f4", "f3"], x: 655, y: 205 },
    { id: "i1", kind: "intent", short: "build server logs", text: "What happened on the build server near the time of the 02:14 alert?", by: "Planner", from: [], x: 60, y: 70 },
    { id: "i2", kind: "intent", short: "database audit log", text: "Who signed in to the customer database overnight?", by: "Planner", from: [], x: 60, y: 185 },
    { id: "i3", kind: "intent", short: "network egress", text: "Did unusual traffic leave the database segment?", by: "Planner", from: [], x: 60, y: 310 },
    { id: "f1", kind: "fact", short: "CI credential, 02:14", text: "Someone used a CI credential from an interactive shell at 02:14.", by: "Worker", from: ["i1"], x: 185, y: 70 },
    { id: "f2", kind: "fact", short: "db sign-in, 02:19", text: "The customer database accepted a service sign-in at 02:19, during the nightly backup window.", by: "Worker", from: ["i2"], x: 185, y: 185 },
    { id: "f3", kind: "fact", short: "no unusual egress", text: "No unusual egress from the database segment overnight.", by: "Worker", from: ["i3"], x: 185, y: 310 },
    { id: "i4", kind: "intent", short: "same actor?", text: "Did the same actor sign in at 02:19?", by: "Planner", from: ["f1", "f2"], x: 330, y: 100 },
    { id: "i5", kind: "intent", short: "backup job?", text: "Was the sign-in at 02:19 the nightly backup job?", by: "Planner", from: ["f2", "h1"], x: 330, y: 205 },
    { id: "h1", kind: "hint", short: "backup is 10.2.x", text: "The backup job always connects from 10.2.x.", by: "Operator", from: [], x: 450, y: 170 },
    { id: "f4", kind: "fact", short: "one actor", text: "The sign-in at 02:19 used the same CI credential. It came from the build server, which is not in 10.2.x.", by: "Worker", from: ["i4"], x: 480, y: 80 },
  ],
  steps: [
    {
      title: "An alert at 02:14",
      text: "The goal is a question, and the incident lead needs the answer before morning. The tools are read-only queries on logs, endpoint telemetry and audit trails.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "Three investigations run at the same time",
      text: "Read-only queries cannot disturb each other or production. No investigation waits for a different investigation.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "The evidence already exists",
      text: "A log is an artifact. Each fact points to rows that a second analyst can read. Fact f3 is negative: the query ran cleanly and found no unusual egress.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "recorded", f2: "recorded", f3: "negative" },
    },
    {
      title: "Two theories about the sign-in at 02:19",
      text: "Intent i4 joins the build-server fact and the database fact. Intent i5 tests a harmless explanation. The logs alone make that explanation plausible.",
      add: ["i4", "i5"],
      set: { i4: "running", i5: "pending" },
    },
    {
      title: "The operator adds a hint",
      text: "A person who knows the environment writes one sentence. The planner reads the hint in its next session, as it reads any other entry.",
      add: ["h1"],
      set: { h1: "hint" },
    },
    {
      title: "Two investigations converge on one actor",
      text: "The sign-in used the credential from f1. It did not come from 10.2.x, so it was not the backup job. The planner drops i5 with a reason.",
      add: ["f4"],
      set: { i4: "done", f4: "reported", i5: "dropped" },
    },
    {
      title: "A second analyst reads the rows",
      text: "A separate session examines each fact behind the answer. It reads the rows that the fact points to.",
      set: { f1: "verified", f2: "verified", f4: "verified" },
    },
    {
      title: "The answer cites a negative fact",
      text: "The intruder reached the customer database. One actor used the CI credential at 02:14 and signed in to the database at 02:19. Fact f3 supports the conclusion that the intruder exported nothing in bulk. A system that discards negative results cannot write this answer.",
      set: { G: "met" },
    },
  ],
};
