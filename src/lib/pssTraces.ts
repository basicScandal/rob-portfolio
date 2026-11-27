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
      text: "You know the treasure exists. You do not know which room holds it or how to get there. The goal goes in the notebook first, so it is still there after every explorer has gone home.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "The leader sends three explorers",
      text: "The team leader reads the notebook and decides where each explorer goes next. Nobody needs the full route at the start.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "Each discovery goes in the same notebook",
      text: "An empty pantry is still a note worth keeping: nobody searches it again. The key and the locked door come from two different explorers, and neither one means much alone.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "negative", f2: "recorded", f3: "recorded" },
    },
    {
      title: "Two notes make one question",
      text: "The leader sees the key and the door on the same page and asks the obvious question. One explorer's discovery has made another explorer's discovery useful.",
      add: ["i4"],
      set: { i4: "running" },
    },
    {
      title: "A different explorer answers it",
      text: "Explorer A was never in the library or the tower. The notebook is enough: take the key, try the door.",
      add: ["f4"],
      set: { i4: "done", f4: "reported" },
    },
    {
      title: "Finding the treasure",
      text: "Someone checks the claim before the expedition calls it done. Explorers got tired, slept and swapped places along the way, and the expedition kept everything it learned.",
      set: { f2: "verified", f3: "verified", f4: "verified", G: "met" },
    },
  ],
};

export const offenseTrace: Trace = {
  id: "offense",
  entries: [
    { id: "G", kind: "goal", short: "code execution", text: "Show code execution on a host in *.company.com. Read-only by default, no data access, nothing persistent, and every state-changing action needs approval.", by: "Operator", from: ["f6"], x: 665, y: 185 },
    { id: "i1", kind: "intent", short: "list hosts", text: "Which hosts exist under *.company.com?", by: "Planner", from: [], x: 55, y: 75 },
    { id: "i2", kind: "intent", short: "public leaks", text: "Do public sources hold credentials for company accounts?", by: "Planner", from: [], x: 55, y: 185 },
    { id: "i3", kind: "intent", short: "main app inputs", text: "Do the inputs of the main application show a flaw?", by: "Planner", from: [], x: 55, y: 295 },
    { id: "f1", kind: "fact", short: "leaked account", text: "A company account appears in a public leak.", by: "Worker", from: ["i2"], x: 170, y: 185 },
    { id: "f2", kind: "fact", short: "admin portal", text: "An unlisted host has an admin portal.", by: "Worker", from: ["i1"], x: 170, y: 75 },
    { id: "f3", kind: "fact", short: "inputs clean", text: "The inputs of the main application are clean, under the stated test conditions.", by: "Worker", from: ["i3"], x: 170, y: 295 },
    { id: "i4", kind: "intent", short: "examine portal", text: "What does the admin portal expose?", by: "Planner", from: ["f2"], x: 290, y: 40 },
    { id: "i5", kind: "intent", short: "default logins", text: "Does the portal accept default logins?", by: "Planner", from: ["f2"], x: 290, y: 125 },
    { id: "f4", kind: "fact", short: "upload feature", text: "The portal has an upload feature behind its sign-in.", by: "Worker", from: ["i4"], x: 400, y: 105 },
    { id: "f5", kind: "fact", short: "company sign-in", text: "The portal signs in ordinary company accounts.", by: "Worker", from: ["i4"], x: 410, y: 30 },
    { id: "i6", kind: "intent", short: "account + upload", text: "Does the leaked account open the portal, and does its upload feature lead to code execution?", by: "Planner", from: ["f1", "f4", "h1"], x: 500, y: 185 },
    { id: "h1", kind: "hint", short: "marker only", text: "Approved. Use the marker command only. Do not open a shell.", by: "Operator", from: [], x: 400, y: 270 },
    { id: "f6", kind: "fact", short: "marker ran", text: "The marker command ran on the portal host. Request and response are stored.", by: "Worker", from: ["i6"], x: 585, y: 185 },
  ],
  steps: [
    {
      title: "A start and an end, and no path",
      text: "The board holds the goal and the rules of engagement. Nothing on it names the host, the service or the flaw.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "The planner proposes three investigations",
      text: "The planner never touches the target. It writes intents, and the dispatcher hands each one to a free worker. All three are read-only, so they run at the same time.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "Three facts, one of them negative",
      text: "f3 says the main application's inputs are clean. That is knowledge: it closes a part of the search space, and the planner does not go back to it. f1 and f2 each look minor.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "recorded", f2: "recorded", f3: "negative" },
    },
    {
      title: "The portal opens two more questions",
      text: "One fact motivates two intents. This work could not have been planned at the start, because the portal was not known at the start.",
      add: ["i4", "i5"],
      set: { i4: "running", i5: "pending" },
    },
    {
      title: "What the portal exposes",
      text: "A worker examines the portal and records two facts. The leaked account, f1, is still sitting on the far side of the graph, found by a different session for a different reason.",
      add: ["f4", "f5"],
      set: { i4: "done", f4: "recorded", f5: "recorded" },
    },
    {
      title: "Two branches converge",
      text: "i6 joins the leaked account and the upload feature. Neither is a finding alone. This is the most important step of the run. The default-logins idea was reasonable, but f5 made it unnecessary, so the planner drops it with a reason and keeps it on the record.",
      add: ["i6"],
      set: { i5: "dropped", i6: "pending" },
    },
    {
      title: "The guard holds it for a human",
      text: "i6 changes state on the target, so code outside the model stops it. The operator approves it with written conditions. The approval is one more entry on the board.",
      add: ["h1"],
      set: { i6: "held", h1: "hint" },
    },
    {
      title: "One harmless command, under conditions",
      text: "The worker runs the marker command and nothing else. The board records the result as reported, not as true: it is a claim with an artifact attached.",
      add: ["f6"],
      set: { i6: "done", f6: "reported" },
    },
    {
      title: "Separate sessions replay the evidence",
      text: "Verifiers that never saw the first worker's reasoning reproduce each fact on the path from its stored artifact.",
      set: { f1: "verified", f2: "verified", f4: "verified", f6: "verified" },
    },
    {
      title: "Goal met, on evidence",
      text: "The goal predicate holds on verified facts, so the run stops and says why. A single agent could do each step. Its difficulty is holding f1 from the moment it finds it to the moment it needs it.",
      set: { G: "met" },
    },
  ],
};

export const defenseTrace: Trace = {
  id: "defense",
  entries: [
    { id: "G", kind: "goal", short: "the answer", text: "Did the intruder reach the customer database, and how far did the intruder get?", by: "Incident lead", from: ["f4", "f3"], x: 655, y: 205 },
    { id: "i1", kind: "intent", short: "build server logs", text: "What happened on the build server around the 02:14 alert?", by: "Planner", from: [], x: 60, y: 70 },
    { id: "i2", kind: "intent", short: "database audit log", text: "Who signed in to the customer database overnight?", by: "Planner", from: [], x: 60, y: 185 },
    { id: "i3", kind: "intent", short: "network egress", text: "Did unusual traffic leave the database segment?", by: "Planner", from: [], x: 60, y: 310 },
    { id: "f1", kind: "fact", short: "CI credential, 02:14", text: "Someone used a CI credential from an interactive shell at 02:14.", by: "Worker", from: ["i1"], x: 185, y: 70 },
    { id: "f2", kind: "fact", short: "db sign-in, 02:19", text: "The customer database accepted a service sign-in at 02:19, inside the nightly backup window.", by: "Worker", from: ["i2"], x: 185, y: 185 },
    { id: "f3", kind: "fact", short: "no unusual egress", text: "No unusual egress from the database segment overnight.", by: "Worker", from: ["i3"], x: 185, y: 310 },
    { id: "i4", kind: "intent", short: "same actor?", text: "Did the same actor sign in at 02:19?", by: "Planner", from: ["f1", "f2"], x: 330, y: 100 },
    { id: "i5", kind: "intent", short: "backup job?", text: "Was the 02:19 sign-in the nightly backup job?", by: "Planner", from: ["f2", "h1"], x: 330, y: 205 },
    { id: "h1", kind: "hint", short: "backup is 10.2.x", text: "The backup job always connects from 10.2.x.", by: "Operator", from: [], x: 450, y: 170 },
    { id: "f4", kind: "fact", short: "one actor", text: "The 02:19 sign-in used the same CI credential and came from the build server, outside 10.2.x.", by: "Worker", from: ["i4"], x: 480, y: 80 },
  ],
  steps: [
    {
      title: "An alert at 02:14, an answer due by morning",
      text: "Here the goal is a question, and every tool is a read-only query on logs, endpoint telemetry and audit trails. The board still holds facts, intents and hints.",
      add: ["G"],
      set: { G: "open" },
    },
    {
      title: "Three investigations, all at once",
      text: "Read-only queries cannot disturb each other or production, so nothing has to wait its turn.",
      add: ["i1", "i2", "i3"],
      set: { i1: "running", i2: "running", i3: "running" },
    },
    {
      title: "The evidence already exists",
      text: "A log is an artifact. Each fact points to rows a second analyst can read. f3 is a negative fact: the query ran cleanly and found nothing unusual.",
      add: ["f1", "f2", "f3"],
      set: { i1: "done", i2: "done", i3: "done", f1: "recorded", f2: "recorded", f3: "negative" },
    },
    {
      title: "Two theories about 02:19",
      text: "One intent joins the build-server fact and the database fact. The other is the innocent explanation, and the logs alone make it plausible.",
      add: ["i4", "i5"],
      set: { i4: "running", i5: "pending" },
    },
    {
      title: "One sentence from someone who knows the place",
      text: "The operator adds a hint. The planner reads it in its next session, like any other entry.",
      add: ["h1"],
      set: { h1: "hint" },
    },
    {
      title: "Two investigations land on one actor",
      text: "The sign-in used the credential from f1 and did not come from 10.2.x. With the hint, the backup theory is gone. The planner drops it with a reason.",
      add: ["f4"],
      set: { i4: "done", f4: "reported", i5: "dropped" },
    },
    {
      title: "A second analyst reads the rows",
      text: "Each fact behind the answer is checked against the rows it points to before anyone relies on it.",
      set: { f1: "verified", f2: "verified", f4: "verified" },
    },
    {
      title: "The answer cites a negative fact",
      text: "Yes, the intruder reached the customer database: one actor, 02:14 to 02:19. And no unusual egress supports the conclusion that nothing was exported in bulk. A system that throws away negative results cannot write this answer.",
      set: { G: "met" },
    },
  ],
};
