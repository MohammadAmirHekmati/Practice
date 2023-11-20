import { Module } from '@nestjs/common';
import { CommonModule } from './Common';
import { ConfigurationModule } from './Configs';

@Module({
  imports: [ConfigurationModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
