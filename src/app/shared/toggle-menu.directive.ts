import {
    Directive,
    ElementRef,
    Renderer2
  } from '@angular/core';
  
  @Directive(
    { selector: '[menu]' }
  )
  export class ToggleMenuDirective {
    creature = 'Dolphin';
  
    constructor(elem: ElementRef, renderer: Renderer2) {
      let shark = renderer.createText('Shark ');
      console.log('test');
      renderer.appendChild(elem.nativeElement, shark);
    }
  }