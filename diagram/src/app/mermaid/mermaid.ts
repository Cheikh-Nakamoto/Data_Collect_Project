import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';
import { MermaidDiagramService, MermaidDiagram } from '../service/mermaid-diagram.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mermaid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mermaid.html',
  styleUrl: './mermaid.css'
})
export class Mermaid implements AfterViewInit {
  @ViewChild('mermaidContainer', { static: true }) mermaidContainer!: ElementRef<HTMLDivElement>;

  zoom = 1; // Zoom initial
  diagrams: MermaidDiagram[] = [];
  selectedDiagram: MermaidDiagram | undefined;

  constructor(private mermaidDiagramService: MermaidDiagramService) {}

  ngAfterViewInit(): void {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    this.diagrams = this.mermaidDiagramService.getDiagrams();
    if (this.diagrams.length > 0) {
      this.selectedDiagram = this.diagrams[0];
      this.renderDiagram();
    }
  }

  onDiagramSelected(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    this.selectedDiagram = this.mermaidDiagramService.getDiagrams().find(d => d.name === selectedName);
    this.renderDiagram();
  }

  renderDiagram() {
    if (this.selectedDiagram) {
      mermaid.render('mermaidGraph', this.selectedDiagram.code).then(({ svg }) => {
        this.mermaidContainer.nativeElement.innerHTML = svg;
      });
    }
  }

  zoomIn() {
    this.zoom += 0.1;
    this.applyZoom();
  }

  zoomOut() {
    if (this.zoom > 0.2) {
      this.zoom -= 0.1;
      this.applyZoom();
    }
  }

  resetZoom() {
    this.zoom = 1;
    this.applyZoom();
  }

  private applyZoom() {
    if (this.mermaidContainer) {
      this.mermaidContainer.nativeElement.style.transform = `scale(${this.zoom})`;
      this.mermaidContainer.nativeElement.style.transformOrigin = 'top left';
    }
  }
}
