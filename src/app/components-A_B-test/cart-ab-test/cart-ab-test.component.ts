import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChartConfiguration } from 'chart.js';

interface RatingEntry {
  rating: number;
}

interface RatingsData {
  A: RatingEntry[];
  B: RatingEntry[];
}

@Component({
  selector: 'app-cart-ab-test',
  templateUrl: './cart-ab-test.component.html',
  styleUrls: ['./cart-ab-test.component.scss']
})
export class CartAbTestComponent implements OnInit {
  selectedVariant: 'A' | 'B' | null = null;
  difference: number = 0;

  ratingsA: number[] = [];
  ratingsB: number[] = [];
  avgA: number = 0;
  avgB: number = 0;

  conclusion: string = '';

  bootstrapResults: number[] = [];

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: "Різниця між A' та B'",
        data: [],
        backgroundColor: '#42A5F5'
      }
    ]
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.assignVariant();
    this.saveVariant();
    this.loadAndAnalyzeRatings();
  }

  assignVariant() {
    const stored = localStorage.getItem('cartVariant');
    if (stored === 'A' || stored === 'B') {
      this.selectedVariant = stored;
    } else {
      this.selectedVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('cartVariant', this.selectedVariant);
    }
  }

  saveVariant() {
    this.firestore.collection('A_B_users').add({
      variant: this.selectedVariant,
      timestamp: new Date()
    });
  }

  async loadAndAnalyzeRatings() {
    const snapshot = await this.firestore.collection('A_B').doc('ratings').ref.get();
    const rawData = snapshot.data();

    const data = rawData as RatingsData;

    this.ratingsA = (data?.A || []).map((x: RatingEntry) => x.rating);
    this.ratingsB = (data?.B || []).map((x: RatingEntry) => x.rating);

    if (this.ratingsA.length === 0 || this.ratingsB.length === 0) return;

    this.avgA = this.ratingsA.reduce((a, b) => a + b, 0) / this.ratingsA.length;
    this.avgB = this.ratingsB.reduce((a, b) => a + b, 0) / this.ratingsB.length;
    this.difference = this.avgA - this.avgB;

    if (Math.abs(this.difference) < 0.05) {
      this.conclusion = 'Різниця між варіантами незначна.';
    } else if (this.difference > 0) {
      this.conclusion = 'Варіант A кращий.';
    } else {
      this.conclusion = 'Варіант B кращий.';
    }

    this.bootstrapResults = this.bootstrapDiff(this.ratingsA, this.ratingsB, 200);
    this.chartData.labels = this.bootstrapResults.map((_, i) => `#${i + 1}`);
    this.chartData.datasets[0].data = this.bootstrapResults;
    console.log('Масив A:', this.ratingsA);
    console.log('Масив B:', this.ratingsB);
  }

  bootstrapDiff(A: number[], B: number[], R: number): number[] {
    const result: number[] = [];
    const combined = [...A, ...B];

    for (let i = 0; i < R; i++) {
      const shuffled = this.shuffle([...combined]);
      const A1 = shuffled.slice(0, A.length);
      const B1 = shuffled.slice(A.length);
      const avgA1 = A1.reduce((a, b) => a + b, 0) / A1.length;
      const avgB1 = B1.reduce((a, b) => a + b, 0) / B1.length;
      result.push(avgA1 - avgB1);
    }

    return result;
  }

  shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
