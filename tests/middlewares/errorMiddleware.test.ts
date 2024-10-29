import { Request, Response, NextFunction } from "express";
import {
  errorHandler,
  HandledError,
} from "../../src/middlewares/errorMidleware";
import { NotFoundError } from "../../src/models/exceptions";
import { ZodError } from "zod";
import { ValidationError } from "sequelize";

describe("Error Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    console.error = jest.fn(); // Mock console.error to avoid cluttering test output
  });

  const callErrorHandler = (err: HandledError) => {
    errorHandler(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
  };

  it("should handle ZodError and return 400 status", () => {
    const zodError = new ZodError([]);
    callErrorHandler(zodError);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });

  it("should handle NotFoundError and return 404 status", () => {
    const notFoundError = new NotFoundError("Resource not found");
    callErrorHandler(notFoundError);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Resource not found",
    });
  });

  it("should handle ValidationError and return 422 status", () => {
    const validationError = new ValidationError("Validation failed", []);
    callErrorHandler(validationError);

    expect(mockResponse.status).toHaveBeenCalledWith(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Validation failed",
    });
  });

  it("should handle other errors and return 500 status", () => {
    const genericError = new Error("Something went wrong");
    callErrorHandler(genericError);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: genericError });
  });
});
