import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../auth/basicAuth.guard";
import { ACLModule } from "../auth/acl.module";
import { ApprovalsController } from "./approvals.controller";
import { ApprovalsService } from "./approvals.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  changeData: "exampleChangeData",
  createdAt: new Date(),
  id: "exampleId",
  originalData: "exampleOriginalData",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  changeData: "exampleChangeData",
  createdAt: new Date(),
  id: "exampleId",
  originalData: "exampleOriginalData",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    changeData: "exampleChangeData",
    createdAt: new Date(),
    id: "exampleId",
    originalData: "exampleOriginalData",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  changeData: "exampleChangeData",
  createdAt: new Date(),
  id: "exampleId",
  originalData: "exampleOriginalData",
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

describe("Approvals", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ApprovalsService,
          useValue: service,
        },
      ],
      controllers: [ApprovalsController],
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

  test("POST /approvals", async () => {
    await request(app.getHttpServer())
      .post("/approvals")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /approvals", async () => {
    await request(app.getHttpServer())
      .get("/approvals")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /approvals/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/approvals"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /approvals/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/approvals"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
