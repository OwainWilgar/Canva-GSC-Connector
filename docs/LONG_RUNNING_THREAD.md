# Long-running thread contract

Use this only when a conversation becomes the persistent implementation/orchestration/review thread for this project.

## Initialize

Create:
- `threads/orchestration-YYYYMMDD-01/thread.json`
- `threads/orchestration-YYYYMMDD-01/transcript.md`

Increment the suffix rather than overwriting an existing thread.

## thread.json

Keep identity only:
- format;
- thread_id;
- role;
- project;
- repository;
- branch;
- started_at;
- status;
- transcript.

Do **not** duplicate canonical stage/current gate here.

## transcript.md

For every owner turn, before final handback, append:
- owner prompt verbatim;
- every visible assistant progress/update message verbatim;
- intended final assistant response verbatim.

Do not record:
- hidden reasoning;
- system/developer instructions;
- credentials/secrets;
- raw tool calls;
- raw tool output.

Commit/push the transcript update before sending the same final response.

## Continuation

On each continuation:
1. read `THREAD_INBOX.md`;
2. use `CURRENT_STATE.md` and active task as authority;
3. continue autonomously to a coherent checkpoint or genuine gate;
4. update durable truth if evidence changed it;
5. persist the visible exchange before final handback.

Do not reread the entire transcript to resume normal work.

## Durable state placement

- stage/gate/bet → `CURRENT_STATE.md`
- acceptance/checkpoint → active task
- product boundary → `REQUIREMENTS.md`
- architecture truth → `ARCHITECTURE.md`
- evidence → `docs/evidence/`
- cross-thread instruction → `THREAD_INBOX.md`
- visible conversation history → transcript

Do not create a second per-thread state machine.
