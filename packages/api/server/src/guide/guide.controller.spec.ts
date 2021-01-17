import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../auth/basicAuth.guard";
import { ACLModule } from "../auth/acl.module";
import { GuideController } from "./guide.controller";
import { GuideService } from "./guide.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  obsolete: new Date(),
  title: "exampleTitle",
  conclusion: "exampleConclusion",
  publishedOn: new Date(),
  introduction: "exampleIntroduction",
  type: "exampleType",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  obsolete: new Date(),
  title: "exampleTitle",
  conclusion: "exampleConclusion",
  publishedOn: new Date(),
  introduction: "exampleIntroduction",
  type: "exampleType",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    id: "exampleId",
    updatedAt: new Date(),
    obsolete: new Date(),
    title: "exampleTitle",
    conclusion: "exampleConclusion",
    publishedOn: new Date(),
    introduction: "exampleIntroduction",
    type: "exampleType",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  id: "exampleId",
  updatedAt: new Date(),
  obsolete: new Date(),
  title: "exampleTitle",
  conclusion: "exampleConclusion",
  publishedOn: new Date(),
  introduction: "exampleIntroduction",
  type: "exampleType",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Guide", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: GuideService,
          useValue: service,
        },
      ],
      controllers: [GuideController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /guides", async () => {
    await request(app.getHttpServer())
      .post("/guides")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        obsolete: CREATE_RESULT.obsolete.toISOString(),
        publishedOn: CREATE_RESULT.publishedOn.toISOString(),
      });
  });

  test("GET /guides", async () => {
    await request(app.getHttpServer())
      .get("/guides")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          obsolete: FIND_MANY_RESULT[0].obsolete.toISOString(),
          publishedOn: FIND_MANY_RESULT[0].publishedOn.toISOString(),
        },
      ]);
  });

  test("GET /guides/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/guides"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /guides/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/guides"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        obsolete: FIND_ONE_RESULT.obsolete.toISOString(),
        publishedOn: FIND_ONE_RESULT.publishedOn.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
