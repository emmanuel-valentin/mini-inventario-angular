import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../interfaces/category.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-producto-page.component.html',
  styles: '',
})
export class NewProductoPageComponent implements OnInit {
  public categories: Category[] = [];
  public productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
    category: new FormControl<Category | null>(null, Validators.required),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    return product;
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((categories) => {
      this.categories = categories;
    });

    if (this.router.url.includes('edit')) {
      this.activatedRoute.params.pipe(
        switchMap(({ id }) => this.productService.findById(id))
      ).subscribe((product) => {
        if (!product) {
          this.router.navigate(['/products']);
          return;
        }
        this.productForm.reset(product);
        return;
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    if (!this.currentProduct.id) {
      this.productService.save(this.currentProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
      return;
    }
    this.productService.update(this.currentProduct).subscribe(() => {
      this.router.navigate(['/products']);
    });
    return;
  }

  compareCategoryObjects(category1: Category, category2: Category): boolean {
    return category1 && category2 ? category1.id === category2.id : category1 === category2;
  }
}
