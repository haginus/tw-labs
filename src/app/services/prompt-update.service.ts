import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionEvent } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {
    this.updates.versionUpdates.subscribe(versionUpdate => {
      this.handleVersionUpdateEvent(versionUpdate);
    });
  }

  private detectedVersionTimeout: number | null = null;

  private handleVersionUpdateEvent(versionUpdate: VersionEvent) {
    let snackbarRef: MatSnackBarRef<TextOnlySnackBar>;
    if(versionUpdate.type == 'VERSION_DETECTED') {
      this.detectedVersionTimeout = window.setTimeout(() => {
        this.snackbar.open('O nouă versiune a fost detectată. Se instalează...');
      }, 500);
    } else {
      if(this.detectedVersionTimeout != null) {
        window.clearTimeout(this.detectedVersionTimeout);
        this.detectedVersionTimeout = null;
      }
      if(versionUpdate.type == 'VERSION_INSTALLATION_FAILED') {
        snackbarRef = this.snackbar.open('Instalarea noii versiuni nu a reușit', 'Reîncercați', {
          duration: 5000
        });
      } else if(versionUpdate.type == 'VERSION_READY') {
        snackbarRef = this.snackbar.open('O nouă versiune a fost instalată.', 'Reîncărcați');
      }
    }

    snackbarRef?.onAction().subscribe(() => {
      window.location.reload();
    });
  }
}
