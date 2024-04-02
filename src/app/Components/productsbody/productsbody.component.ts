import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/Products/products.service";
import {ProductsAll} from "../../../models/products";
import {Products} from "../../../models/products";
import {CheckboxstateService} from "../../service/checkboxState/checkboxstate.service";


@Component({
  selector: 'app-productsbody',
  templateUrl: './productsbody.component.html',
  styleUrl: './productsbody.component.scss'
})
export class ProductsbodyComponent implements OnInit {
  products: Array<ProductsAll> = [];

  constructor(private productsService: ProductsService, private checkboxService: CheckboxstateService) {}

  ngOnInit() {
    this.checkboxService.filteredProducts$.subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
}
