/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myAddress]',
})
export class myAddress {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~!@$%^&*()_+\=\[\]{};"`':'\\|<>\?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}
@Directive({
  selector: '[appmyUserName]',
})
export class myUserNameDirective {
  constructor(element: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(ev: any) {
    const regex = new RegExp(/^[~!`@#+:,$%^&/*()={};'"\\|<>?]*$/);
    const key = String.fromCharCode(!ev.charCode ? ev.which : ev.charCode);
    if (regex.test(key)) {
      ev.preventDefault();
    }
  }
}