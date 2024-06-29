import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/category.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias-page.component.html',
})
export class CategoriasPageComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .findAll()
      .subscribe((categories) => (this.categories = categories));
  }

  onDeleteCategory(id?: number): void {
    if (!id) return;
    this.categoryService
      .delete(id)
      .subscribe((wasDeleted) => {
        console.log(wasDeleted);
        if (!wasDeleted) return;
        this.categories = this.categories.filter((category) => category.id !== id);
      });
  }
}
