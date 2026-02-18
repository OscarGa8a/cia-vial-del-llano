import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from './shared/components';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';

/**
 * Root application shell — provides the global layout with header, footer
 * and the floating WhatsApp button around the routed page content.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, WhatsappButtonComponent],
  templateUrl: './app.html',
})
export class App {}
