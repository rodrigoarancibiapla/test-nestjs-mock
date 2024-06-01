import { Module } from "@nestjs/common";
import { TestService } from "./testservice/testservice.service";
import { TestDepService } from "./testdepservice/testdepservice.service";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [ConfigModule],
  providers: [TestService, TestDepService],
})
export class TestModule {}
