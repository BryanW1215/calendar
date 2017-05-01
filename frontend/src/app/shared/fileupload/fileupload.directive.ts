import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthenticatedHttpService} from "../../services/authenticated.http.service";
@Directive({
  selector: '[file-upload]'
})
export class FileuploadDirective implements OnInit, OnDestroy {
  private fileInput: any;
  @Input('fu-multiple') multiple: string;
  @Input('fu-accept') accept: string;
  @Input('fu-path') path: string;
  @Input('fu-success') success: Function;
  @Input('fu-error') error: Function;


  constructor(private elementRef: ElementRef, private http: AuthenticatedHttpService) {
    this.selectFile = this.selectFile.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);

  }

  private selectFile() {
    this.fileInput.click();
  }

  private createFileElement() {
    this.fileInput = document.createElement('input');
    this.fileInput.setAttribute('type', 'file');
    this.fileInput.setAttribute('style', 'display:none;');
    this.multiple && this.fileInput.setAttribute('multiple', '');
    this.accept && this.fileInput.setAttribute('accept', this.accept);
    document.body.appendChild(this.fileInput);
    this.fileInput.onchange = event => this.uploadFiles(event);
  }

  private uploadFiles(event) {
    let files = event.target.files;
    if(!files.length){
      return;
    }
    let url = environment.apiUrl + this.path;
    this.http.file(url, files).subscribe(result => result && this.success(result));
  }

  ngOnInit() {
    this.success = this.success || function () {};
    this.error = this.error || function () {};
    this.createFileElement();
    this.elementRef.nativeElement.onclick = this.selectFile;
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.onclick = null;
    document.body.removeChild(this.fileInput);
  }
}
