# The Receipts

Automated evidence beats human attestation.

When someone asks "Did you check X?" there are two kinds of answers:

**Attestation:** "Yes, I checked X." This tells you that a human claims to have done something. Maybe they did. Maybe they did it thoroughly. Maybe they did it briefly. Maybe they thought they did but missed something. You can't know.

**Evidence:** "Here's the record of X being checked, the results, the timestamp, the inputs, the outputs." This tells you what actually happened. Not what someone claims happened. What actually happened.

The difference matters because attestation doesn't scale and evidence does.

## Why Attestation Fails

A reviewer checks a pull request. They click "Approve." What have you learned?

You've learned that a human with a particular name clicked a button at a particular time. You haven't learned what they actually checked. You haven't learned how thoroughly they reviewed. You haven't learned whether they understood the code.

The approval is attestation. "I looked at this." It provides no information about the quality of the looking.

As volume increases, attestation degrades. Reviewers can't keep up. They scan instead of read. They approve to clear the queue. The attestation continues: clicks happen, buttons are pressed. The reality changes: actual review becomes minimal or absent.

You can't see this degradation by looking at the approvals. The approvals look the same whether review is thorough or perfunctory. The signal that once meant "carefully reviewed" now means "someone clicked approve."

This is why audit trails based on human attestation are weak. They record that processes happened. They don't record whether processes achieved their purpose.

## What Evidence Looks Like

Evidence is concrete and verifiable. Not "someone checked" but "here's what was checked and what was found."

**Test results** are evidence. The test ran. These assertions were verified. This code path was exercised. These conditions were confirmed. The record shows exactly what was tested and what the results were.

**Scan outputs** are evidence. The security scanner found zero critical vulnerabilities, three medium vulnerabilities (here they are), and twelve low vulnerabilities. The record shows what was scanned and what was found.

**Deployment logs** are evidence. This commit deployed at this time to this environment. These health checks passed. This monitoring confirmed successful startup. The record shows exactly what happened.

**Monitoring data** is evidence. After deployment, error rates remained stable. Latency increased by 2ms. No alerts fired. The record shows the actual system behavior.

Evidence doesn't require human interpretation to be valid. The test passed or failed. The scan found issues or didn't. The metrics moved or stayed stable. The evidence exists independent of human attention.

## The Audit Difference

Organizations need audit trails. For compliance. For debugging. For learning.

Audit trails based on attestation answer: "Did someone claim to do X?"

Audit trails based on evidence answer: "What actually happened?"

The second question is more useful. When an incident occurs, you don't want to know that someone approved a deployment. You want to know what was tested, what was deployed, what changed, what the system did after the change.

Evidence-based audit trails support real investigation. Attestation-based audit trails support blame assignment. The difference shapes organizational culture.

## Building Evidence Infrastructure

Every check that matters should produce evidence.

**Automated tests:** Store results, not just pass/fail. Which tests ran? What did they verify? Where's the output? If tests are the evidence that code works, the evidence should be accessible.

**Security scans:** Store findings, not just approvals. What was scanned? What was found? What was the severity? How was it addressed? The scan output is the evidence.

**Deployment records:** Store the full context. What code? What configuration? What environment? What health checks? What did monitoring show? The deployment log is the evidence.

**Approvals:** If human approval is required, record the context. What did the approver see? What information was available? What was the decision rationale? The approval with context is better evidence than the approval alone.

The infrastructure cost is real but bounded. Storage is cheap. Automation is cheap. The cost of not having evidence when you need it is expensive and unbounded.

## The Cultural Shift

Moving from attestation to evidence changes how people think about verification.

Attestation culture: "Did you do it?" The question is about process compliance. The answer is yes or no. Gaming is easy: claim to have done something without doing it.

Evidence culture: "Show me what happened." The question is about actual results. The answer is data. Gaming is hard: you can't fake evidence without effort.

This shift feels threatening to people whose value proposition was "I checked this." If the checking is automated and the evidence is recorded, what role remains for the human?

The answer: judgment on things that can't be automated. Novel situations. Strategic decisions. Interpretation of ambiguous evidence. Humans remain essential, but for different reasons than before.

The shift also changes accountability. When evidence exists, mistakes become visible. People resist visibility of their mistakes. This resistance is natural but counterproductive. Organizations that punish visible mistakes get hidden mistakes. Organizations that learn from visible mistakes get fewer mistakes.

## The Compliance Connection

Compliance regimes often require attestation. "Sign here to confirm you reviewed X."

Evidence-based approaches exceed these requirements. If regulators want assurance that code was reviewed, automated test results plus scan outputs plus deployment verification plus monitoring data provides more assurance than a signature ever could.

The signature says someone claimed to review. The evidence shows what was actually verified.

Organizations with good evidence infrastructure often find compliance easier, not harder. They have more documentation of what actually happened. They can answer auditor questions with data instead of claims. They can demonstrate due diligence rather than assert it.

The receipts don't just make engineering better. They make compliance defensible.

Evidence over attestation. Receipts over claims. Data over signatures.

That's how you know what actually happened.
