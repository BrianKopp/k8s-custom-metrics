# Per Pod Metric

This repository demonstrates how a pod can produce its own metrics, exposed
via prometheus. It exposes the `/metrics` api for prometheus to pull
metrics from, and it exposes a `/value` metric to allow a value to be
assigned publically to mock the usage we'd be measuring in real life.
