import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '@core/data/services.data';
import type { Service } from '@core/models/service.model';
import { Whatsapp } from '@core/services';
import { ArrowRightIcon, MessageCircleIcon } from 'lucide-angular';
import { Icon } from '@shared/components';

/** Introduces the site's service areas and provides a contextual contact path. */
@Component({
  selector: 'app-services-section',
  imports: [RouterLink, Icon],
  templateUrl: './services-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  private readonly whatsapp = inject(Whatsapp);

  protected readonly services = SERVICES;
  protected readonly ArrowRightIcon = ArrowRightIcon;
  protected readonly MessageCircleIcon = MessageCircleIcon;

  protected contact(service: Service): void {
    this.whatsapp.openServiceChat(service, 'home-services');
  }
}
