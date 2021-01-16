import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../auth/basicAuth.guard";
import { ACLModule } from "../auth/acl.module";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  data: "exampleData",
  id: "exampleId",
  readOn: new Date(),
  type: "exampleType",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  createdAt: new Date(),
  data: "exampleData",
  id: "exampleId",
  readOn: new Date(),
  type: "exampleType",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    data: "exampleData",
    id: "exampleId",
    readOn: new Date(),
    type: "exampleType",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  data: "exampleData",
  id: "exampleId",
  readOn: new Date(),
  type: "exampleType",
  updatedAt: new Date(),
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

describe("Notification", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: NotificationService,
          useValue: service,
        },
      ],
      controllers: [NotificationController],
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

  test("POST /notifications", async () => {
    await request(app.getHttpServer())
      .post("/notifications")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        readOn: CREATE_RESULT.readOn.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /notifications", async () => {
    await request(app.getHttpServer())
      .get("/notifications")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          readOn: FIND_MANY_RESULT[0].readOn.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /notifications/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/notifications"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /notifications/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/notifications"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        readOn: FIND_ONE_RESULT.readOn.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
