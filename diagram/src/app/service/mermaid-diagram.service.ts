import { Injectable } from '@angular/core';
import { creationDeFormDiagramCode } from '../mermaidCode/Creation_de_form-diagram';
import { connexionDiagramCode } from '../mermaidCode/connexion-diagram';
import { inscriptionDiagramCode } from '../mermaidCode/inscription-diagram';
import { ResponseDiagramCode } from '../mermaidCode/reponse-diagram';

export interface MermaidDiagram {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class MermaidDiagramService {
  private diagrams: MermaidDiagram[] = [
    { name: 'Inscription Diagram', code: inscriptionDiagramCode },
    { name: 'Connexion Diagram', code: connexionDiagramCode },
    { name: 'Creation de Form Diagram', code: creationDeFormDiagramCode },
    { name: 'Réponse Diagram', code: ResponseDiagramCode },
  ];

  getDiagrams(): MermaidDiagram[] {
    return this.diagrams;
  }

  getDiagramCode(name: string): string | undefined {
    return this.diagrams.find(d => d.name === name)?.code;
  }
}