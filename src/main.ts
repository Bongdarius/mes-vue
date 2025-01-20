import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Wijmo
import '@mescius/wijmo.styles/wijmo.css';
import { registerChart } from '@mescius/wijmo.vue2.chart';
import { registerChartAnalytics } from '@mescius/wijmo.vue2.chart.analytics';
import { registerChartAnimation } from '@mescius/wijmo.vue2.chart.animation';
import { registerChartAnnotation } from '@mescius/wijmo.vue2.chart.annotation';
import { registerChartFinance } from '@mescius/wijmo.vue2.chart.finance';
import { registerChartHierarchical } from '@mescius/wijmo.vue2.chart.hierarchical';
import { registerChartInteraction } from '@mescius/wijmo.vue2.chart.interaction';
import { registerChartRadar } from '@mescius/wijmo.vue2.chart.radar';
import { registerCore } from '@mescius/wijmo.vue2.core';
import { registerGauge } from '@mescius/wijmo.vue2.gauge';
import { registerGrid } from '@mescius/wijmo.vue2.grid';
import { registerGridDetail } from '@mescius/wijmo.vue2.grid.detail';
import { registerGridFilter } from '@mescius/wijmo.vue2.grid.filter';
import { registerGridGrouppanel } from '@mescius/wijmo.vue2.grid.grouppanel';
import { registerGridMultirow } from '@mescius/wijmo.vue2.grid.multirow';
import { registerGridSearch } from '@mescius/wijmo.vue2.grid.search';
import { registerGridSheet } from '@mescius/wijmo.vue2.grid.sheet';
import { registerGridTransposed } from '@mescius/wijmo.vue2.grid.transposed';
import { registerGridTransposedMultirow } from '@mescius/wijmo.vue2.grid.transposedmultirow';
import { registerInput } from '@mescius/wijmo.vue2.input';
import { registerNav } from '@mescius/wijmo.vue2.nav';
import { registerOlap } from '@mescius/wijmo.vue2.olap';
import { registerViewer } from '@mescius/wijmo.vue2.viewer';

// Prime vue
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

// Tailwindcss
import './index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(registerChart);
app.use(registerChartAnalytics);
app.use(registerChartAnimation);
app.use(registerChartAnnotation);
app.use(registerChartFinance);
app.use(registerChartHierarchical);
app.use(registerChartInteraction);
app.use(registerChartRadar);
app.use(registerCore);
app.use(registerGauge);
app.use(registerGrid);
app.use(registerGridDetail);
app.use(registerGridFilter);
app.use(registerGridGrouppanel);
app.use(registerGridMultirow);
app.use(registerGridSearch);
app.use(registerGridSheet);
app.use(registerGridTransposed);
app.use(registerGridTransposedMultirow);
app.use(registerInput);
app.use(registerNav);
app.use(registerOlap);
app.use(registerViewer);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
