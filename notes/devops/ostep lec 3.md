### Lecture Summary

The lecture begins by introducing the concept of CPU scheduling, contrasting it with the context switching mechanisms discussed previously \[[05:00](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=300)\]. It defines key terminology such as "workload," "jobs" (representing CPU bursts of a process), and various scheduling policies \[[08:50](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=530)\]. The lecture then delves into different metrics for evaluating schedulers, primarily focusing on **turnaround time** and **response time** \[[10:24](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=624)\].

The instructor progressively introduces scheduling algorithms by relaxing initial, unrealistic assumptions about job characteristics:

- **Initial Assumptions:** All jobs have the same run time, arrive simultaneously, only use the CPU, and their run times are known in advance \[[13:53](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=833)\].
- **First-Come, First-Serve (FIFO):** The simplest policy, where jobs are scheduled in the order they arrive. While straightforward, it performs poorly if a long job arrives first, causing shorter jobs to wait excessively \[[15:33](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=933)\].
- **Shortest Job First (SJF):** This non-preemptive policy is optimal for minimizing average turnaround time when job lengths are known and all jobs arrive at the same time \[[21:09](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1269)\]. However, it suffers when jobs arrive at different times and cannot preempt a running long job \[[25:20](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1520)\].
- **Shortest Time to Completion First (STCF) / Shortest Remaining Time First (SRTF):** The preemptive version of SJF. It improves performance when jobs arrive at different times by allowing shorter newly arrived jobs to preempt a longer running job \[[27:19](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1639)\]. This also naturally handles I/O-bound jobs effectively, as short CPU bursts (jobs) are prioritized \[[33:05](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1985)\].
- **Round Robin (RR):** Introduced to address the lack of knowledge about job run times. It gives each job a fixed "time slice" and cycles through ready jobs, ensuring all jobs get a chance to run. RR excels at minimizing response time but can be inefficient if all jobs have similar lengths due to increased context switching overhead \[[37:29](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=2249)\].

Finally, the lecture presents the **Multi-Level Feedback Queue (MLFQ)** as the most realistic and commonly used scheduler in modern operating systems \[[46:11](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=2771)\]. MLFQ attempts to combine the benefits of previous algorithms by:

- Using multiple priority levels (queues) with different time slice lengths \[[46:52](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=2812)\].
- Starting new jobs at the highest priority (optimistic assumption) \[[50:16](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3016)\].
- Demoting jobs to lower priority queues if they consume their entire time slice (indicating they are CPU-bound) \[[50:27](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3027)\].
- Employing a "priority boost" mechanism to prevent starvation of low-priority jobs \[[53:30](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3210)\].
- Accounting for total CPU time at a given priority level to prevent "gaming" the scheduler by quickly yielding the CPU \[[59:34](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3574)\].

The lecture concludes by mentioning other schedulers like **Lottery Scheduling** as a proportional share algorithm, which assigns "tickets" to processes and randomly selects a winner to run, making it simple to implement and difficult to game \[[01:02:19](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3739)\].

### Key Points:

- **Policy vs. Mechanism:** CPU scheduling is a policy problem (deciding _which_ process to run _when_), distinct from the mechanism of context switching \[[05:00](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=300)\].
- **Job Abstraction:** Scheduling focuses on "jobs" (CPU bursts of a process) rather than entire processes, allowing for efficient handling of I/O operations \[[09:30](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=570)\].
- **Scheduler Metrics:** Key metrics include turnaround time (total completion time minus arrival time) and response time (time until a job first starts running after arrival) \[[10:24](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=624)\]. Other metrics include throughput, resource utilization, overhead, and fairness \[[11:41](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=701)\].
- **Preemption:** Preemptive schedulers (like STCF and Round Robin) can forcibly stop a running job to schedule a more critical one, which is crucial for responsiveness \[[27:04](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1624)\]. Non-preemptive schedulers (FIFO, SJF) must wait for a job to voluntarily yield the CPU \[[26:43](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1603)\].
- **MLFQ Design Principles:**
  - **Prioritize interactive/short jobs:** New jobs start at high priority \[[50:16](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3016)\].
  - **Identify CPU-bound jobs:** Demote jobs that use their full time slice \[[50:27](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3027)\].
  - **Prevent starvation:** Periodically boost the priority of all jobs \[[53:30](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3210)\].
  - **Prevent gaming:** Account for total CPU time used at a priority level, not just per time slice \[[59:34](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3574)\].
  - **No Ideal Scheduler:** The optimal scheduler depends on the specific workload characteristics and the desired optimization metric \[[01:07:50](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=4070)\].

### Knowledge Gaps This Lecture May Fill:

- **Understanding Operating System Decision-Making:** How an OS decides which program to run at any given moment, beyond just knowing _how_ to switch between them.
- **Trade-offs in Scheduling:** Why different scheduling algorithms exist and the specific scenarios they are best suited for (e.g., turnaround time vs. response time optimization).
- **Handling Imperfect Information:** How real-world schedulers cope with not knowing a job's future behavior.
- **Managing Interactive vs. Batch Workloads:** The challenges and solutions for efficiently running a mix of short, responsive tasks and long, CPU-intensive tasks.
- **Starvation and Gaming:** Common problems in scheduling and how practical schedulers address them.

### Questions That Can Be Answered By Watching This Lecture:

- What is the difference between CPU scheduling policy and mechanism? \[[05:00](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=300)\]
- What are the definitions of turnaround time and response time in the context of CPU scheduling? \[[10:24](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=624)\]
- How does the First-Come, First-Serve (FIFO) scheduling policy work, and what are its limitations? \[[15:33](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=933)\]
- When is Shortest Job First (SJF) optimal for minimizing average turnaround time? \[[21:09](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1269)\]
- How does Shortest Time to Completion First (STCF) improve upon SJF, especially when jobs arrive at different times? \[[27:19](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=1639)\]
- Why is Round Robin (RR) a good choice for interactive jobs, and what are its potential drawbacks? \[[37:29](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=2249)\]
- What are the core rules and goals of a Multi-Level Feedback Queue (MLFQ) scheduler? \[[46:11](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=2771)\]
- How does MLFQ prevent CPU-bound jobs from monopolizing the processor, and how does it prevent starvation? \[[50:27](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3027)\], \[[53:30](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3210)\]
- What is Lottery Scheduling, and what are its advantages? \[[01:02:19](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3739)\]

### Homework Problems:

- **Project One (Due Monday Evening):** This is a project that was assigned previously. There will be no Piazza answers after Monday afternoon, and labs stop at 10 PM, though the project is due at midnight \[[01:02:50](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=3770)\].
- **Project Two (Available Now):** This project is due the Monday after Project One. It is expected to be more challenging, involving the xv6 kernel environment \[[03:00](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=180)\]. Students are encouraged to look at the spec before next Wednesday's discussion section \[[03:32](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=212)\].
- **Homework (Due in One Week):** A simple Canvas quiz designed to provide practice with sample exam questions. It can be taken multiple times, and correct answers are shown upon completion \[[03:42](http://www.youtube.com/watch?v=f2xM0LbLL-w&t=222)\].

### Ponder Question:

- **Time Slice Optimization:** Given the trade-offs of time slice length in Round Robin (too long degenerates to FIFO, too short increases overhead), how could a scheduler dynamically adjust the time slice for different priority levels or job types to achieve a better balance between response time and throughput? (This is partially addressed by MLFQ, but the question encourages deeper thought into the dynamic adjustment aspect).
- **Gaming the Scheduler (Beyond MLFQ):** If you were designing a new proportional share scheduler, how would you ensure it is robust against malicious processes attempting to gain more CPU time than allocated, beyond the "lottery ticket" approach?


https://www.youtube.com/watch?v=f2xM0LbLL-w&list=PLzBbfbHQmjyuqBFJ8KpDdcvnLNkvPXbS-&index=4
