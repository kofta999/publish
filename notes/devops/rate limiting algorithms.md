2025-09-06 11:53
Tags: #system-design 
##### Content
#### Leaky Bucket Algorithm
* This algorithm processes requests at a fixed rate, similar to a bucket with a hole at the bottom that lets water out at a constant pace.
* Even if a burst of requests arrives, they are handled at a steady rate, and any excess requests are discarded.
* It's well-suited for stable request handling in scenarios like network bandwidth management.

#### Token Bucket Algorithm
* This algorithm allows a system to handle bursts of traffic by allowing more requests than the fixed rate for a short time.
* Tokens are added to a bucket at a fixed rate, and each request consumes a token.
* If no tokens are available, the request is either rejected or delayed.
* This algorithm is widely used for API rate limiting to control request rates from users or applications.

#### Fixed Window Counter Algorithm
* Time is divided into fixed intervals, and the number of requests within each window is counted.
* If the number of requests exceeds a threshold, any additional requests are rejected until the next window begins.
* This method is suitable for simple strategies where system traffic is generally steady with short-term fluctuations.

#### Sliding Window Log Algorithm
* This algorithm improves on the fixed window counter by logging the timestamp of each accepted request.
* When a new request arrives, the system checks the log to count requests within the recent time window.
* It provides more precise and smoother traffic control by addressing the issue of request spikes that can occur at the boundaries of fixed windows.

#### Sliding Window Counter Algorithm
* This algorithm balances the fixed window counter and the sliding window log algorithms.
* It manages and smooths traffic by waiting for request counts from adjacent windows using a weighted formula.
* It is more complex to implement but provides a more precise method for smoothing traffic at window boundaries.

##### References
https://www.youtube.com/watch?v=mQCJJqUfn9Y