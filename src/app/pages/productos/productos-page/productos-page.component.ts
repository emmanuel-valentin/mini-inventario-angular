import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos-page.component.html',
  styles: ``,
})
export class ProductosPageComponent implements OnInit {
  public products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .findAll()
      .subscribe((products) => (this.products = products));
  }

  onDeleteProduct(id: number) {
    if (!id) return;
    this.productService.delete(id).subscribe((wasDeleted) => {
      if (!wasDeleted) return;
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
