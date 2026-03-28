// Survey visualization using Chart.js
// All data shown is SIMULATED for illustration purposes

document.addEventListener('DOMContentLoaded', function () {
  var containers = document.querySelectorAll('[data-experiment]');
  if (!containers.length) return;

  // Load the simulated data
  var basePath = document.querySelector('meta[name="basepath"]');
  var base = basePath ? basePath.content : '';
  var dataUrl = base + '/assets/data/simulated-experiments.json';

  fetch(dataUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      containers.forEach(function (el) {
        var key = el.getAttribute('data-experiment');
        var chartType = el.getAttribute('data-chart-type') || 'bar';
        if (data[key]) {
          if (chartType === 'strip') {
            renderStripChart(el, data[key]);
          } else {
            renderBarChart(el, data[key]);
          }
        }
      });
    })
    .catch(function (err) {
      console.warn('Could not load experiment data:', err);
    });
});

function renderBarChart(container, experiment) {
  var canvas = document.createElement('canvas');
  container.appendChild(canvas);

  var conditions = Object.values(experiment.conditions);
  var labels = conditions.map(function (c) { return c.label; });
  var means = conditions.map(function (c) { return c.mean; });
  var colors = conditions.map(function (c) { return c.color; });
  var lowers = conditions.map(function (c) { return c.mean - c.ci_lower; });
  var uppers = conditions.map(function (c) { return c.ci_upper - c.mean; });

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: experiment.outcome,
        data: means,
        backgroundColor: colors.map(function (c) { return c + 'CC'; }),
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 6,
        barPercentage: 0.55,
        errorBars: {
          lower: lowers,
          upper: uppers
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: experiment.outcome + ' by Condition',
          font: { size: 14, weight: '600' },
          color: '#2D3748',
          padding: { bottom: 16 }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              var cond = conditions[ctx.dataIndex];
              return cond.label + ': M = ' + cond.mean.toFixed(2) +
                ' [' + cond.ci_lower.toFixed(2) + ', ' + cond.ci_upper.toFixed(2) + ']' +
                ' (n = ' + cond.n + ')';
            }
          }
        }
      },
      scales: {
        y: {
          min: 1,
          max: 5,
          title: {
            display: true,
            text: experiment.outcome,
            font: { size: 12 },
            color: '#718096'
          },
          grid: { color: '#E2E8F0' },
          ticks: { color: '#718096' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#2D3748', font: { weight: '600' } }
        }
      }
    },
    plugins: [{
      id: 'errorBars',
      afterDraw: function (chart) {
        var meta = chart.getDatasetMeta(0);
        var ctx = chart.ctx;
        meta.data.forEach(function (bar, i) {
          var cond = conditions[i];
          var yScale = chart.scales.y;
          var yLower = yScale.getPixelForValue(cond.ci_lower);
          var yUpper = yScale.getPixelForValue(cond.ci_upper);
          var x = bar.x;
          var capW = 8;

          ctx.save();
          ctx.strokeStyle = '#2D3748';
          ctx.lineWidth = 1.5;

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(x, yLower);
          ctx.lineTo(x, yUpper);
          ctx.stroke();

          // Lower cap
          ctx.beginPath();
          ctx.moveTo(x - capW, yLower);
          ctx.lineTo(x + capW, yLower);
          ctx.stroke();

          // Upper cap
          ctx.beginPath();
          ctx.moveTo(x - capW, yUpper);
          ctx.lineTo(x + capW, yUpper);
          ctx.stroke();

          ctx.restore();
        });
      }
    }]
  });
}

// Deterministic pseudo-random jitter so strip charts look the same on every load
function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function renderStripChart(container, experiment) {
  var canvas = document.createElement('canvas');
  container.appendChild(canvas);

  var conditions = Object.values(experiment.conditions);
  var jitterSeed = 42;
  var datasets = conditions.map(function (cond, i) {
    return {
      label: cond.label,
      data: cond.points.map(function (y, j) {
        jitterSeed++;
        return { x: i + (seededRandom(jitterSeed + i * 100 + j) - 0.5) * 0.3, y: y };
      }),
      backgroundColor: cond.color + '88',
      borderColor: cond.color,
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6
    };
  });

  // Add mean markers
  var meanDataset = {
    label: 'Mean',
    data: conditions.map(function (cond, i) {
      return { x: i, y: cond.mean };
    }),
    backgroundColor: '#2D3748',
    borderColor: '#2D3748',
    borderWidth: 2,
    pointRadius: 7,
    pointStyle: 'rectRot',
    pointHoverRadius: 9,
    showLine: false
  };
  datasets.push(meanDataset);

  new Chart(canvas, {
    type: 'scatter',
    data: { datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            font: { size: 11 }
          }
        },
        title: {
          display: true,
          text: 'Individual Responses by Condition (with Means)',
          font: { size: 14, weight: '600' },
          color: '#2D3748',
          padding: { bottom: 16 }
        }
      },
      scales: {
        y: {
          min: 1,
          max: 5,
          title: {
            display: true,
            text: experiment.outcome,
            font: { size: 12 },
            color: '#718096'
          },
          grid: { color: '#E2E8F0' },
          ticks: { color: '#718096' }
        },
        x: {
          min: -0.5,
          max: conditions.length - 0.5,
          ticks: {
            callback: function (val) {
              return conditions[val] ? conditions[val].label : '';
            },
            color: '#2D3748',
            font: { weight: '600' },
            stepSize: 1
          },
          grid: { display: false }
        }
      }
    }
  });
}
