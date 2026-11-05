# Presenter guide

Aim for about 18 minutes, then take questions. The detailed website is the appendix; do not try to read every tab aloud. Speaker cues are available with N in presentation mode.

## Suggested run of show

| Time | Screen | Point to land |
| --- | --- | --- |
| 0:00–1:30 | Thesis | The five scenarios share identity, definitions, ownership, and reliable execution. |
| 1:30–4:00 | Lead quality | Model age is not a diagnosis. Compare mature cohorts; protect opportunity coverage. |
| 4:00–8:00 | Territories + lab | Fair opportunity relative to usable capacity, within constraints. Give this the most time. |
| 8:00–10:30 | Reporting | Reconcile the full total, make exposure visible, and avoid false forecast certainty. |
| 10:30–13:00 | Stage alignment | More detail can coexist with comparable roll-ups, but history cannot be invented. |
| 13:00–16:00 | Systems + lab | A correct route depends on identity, fresh data, ownership, and safe recovery. |
| 16:00–17:30 | Implementation | Stabilise, pilot, then scale with exit gates and named owners. |
| 17:30–18:00 | Decision standard | Invite a challenge to a specific assumption. |

## A possible opening

“I see these as five connected decisions. A scoring model is only useful if the underlying account identity is trustworthy, the account reaches an eligible rep, and the resulting outcomes are measured consistently. My approach is to repair the foundations, make the decisions explicit, and introduce changes in a way we can observe and reverse.”

Use your own wording and modify any recommendation you do not agree with.

## Demonstration sequence

### Lead quality

Open the lab with the default mature, cleaned cohort. Explain queue size, observed yield, and outcome coverage. Raise the routing threshold and show how coverage changes. Turn off cohort maturity to explain why a recent cohort can look worse. Emphasise that this is synthetic descriptive replay, not proof of causal uplift.

### Territory planning

Start with Hybrid at 50% new-hire usable capacity. Explain that the six existing reps are an illustrative assumption; the brief only specifies the 200 accounts and three hires. Compare Geography and strict regional industry eligibility. Discuss why thin specialist coverage can strand accounts. Increase ramp capacity, inspect an account, and show the assignment rationale. Keep the unassigned queue visible.

The algorithm ranks by a potential proxy and assigns within eligible capacity. It is deterministic and explainable; it does not establish a global optimum or a predicted revenue result. Opportunity imbalance is the coefficient of variation of assigned potential per available capacity: standard deviation divided by mean. Lower is more balanced under this chosen proxy, not necessarily better commercially.

### Reporting

The total equals the quality-screened portion plus distinct unresolved exposure. Issues can overlap, so adding issue-category totals would double-count opportunities. Change the exposure-inclusion slider. Explain that these are quarter-scope sensitivity scenarios, not close probabilities. A complete opportunity record can still be wrong.

### Stage alignment

Select Discovery or Validation. Both roll up to historical Evaluation in the illustrative schema. Explain that old Evaluation records remain at the original known granularity. A crosswalk only works where definitions are genuinely comparable; probabilities and downstream workflows require separate validation.

### Systems

Select CRM write fails. Show that routing does not proceed after a partial failure. Recover and retry using the same event ID, then select Duplicate event. Explain why safe replay should not create another assignment. Select Older event arrives late to show why destination version checks matter.

## Understand these terms before presenting

- **Cohort maturity:** giving records comparable time to reach the outcome being measured.
- **Precision / observed yield:** qualified outcomes in the selected queue divided by queue size.
- **Outcome coverage:** captured qualified outcomes divided by all qualified outcomes in the eligible comparison population.
- **Canonical identity:** a stable entity identifier and links across systems; a domain or email is a matching signal rather than a universal identifier.
- **Field authority:** the designated system/process allowed to author a field.
- **Idempotency:** replaying the same event does not create a second business action.
- **Out-of-order protection:** an older update must not overwrite a newer accepted version.
- **Reporting crosswalk:** a versioned mapping between operational categories and an agreed reporting framework.
- **Reconciliation:** checking that records and totals agree across views or systems, with explainable differences.

## Questions to rehearse

1. What evidence would make you change each recommendation?
2. Why is a higher lead conversion rate not sufficient evidence of a better scoring model?
3. How would you distinguish rep skill from an industry opportunity advantage?
4. How do you protect active deals when changing territories?
5. What can leadership safely decide from an imperfect report?
6. When does a crosswalk fail to preserve comparability?
7. Why not send everything through the warehouse immediately?
8. When would custom integration code be justified over a native connector?
9. Who owns the exception when automation cannot make a safe decision?
10. Which change would you make in the first week, and how would you know it worked?

## Before the interview

Open the hosted app, test its PDF download, and keep the PDF and offline HTML available locally. Present in a full browser window for the clearest layout. Hide speaker notes before screen sharing. Be ready to distinguish supplied facts, public company context, and demonstration assumptions. Review every recommendation and make the reasoning your own.
