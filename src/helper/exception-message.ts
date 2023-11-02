import {
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { isString } from 'class-validator';
import { EntityNotFoundError } from 'typeorm';

export const EXCEPTION_MESSAGE = {
  [EntityNotFoundError.name]: '未找到相关数据',
  [ThrottlerException.name]: '访问频率超过限制，请稍后再试',
};

export const getCustomExceptionMessage = (err: Error) => {
  if (!err?.name) return null;
  return EXCEPTION_MESSAGE[err.name] || null;
};

type ResponseException = {
  statusCode: HttpStatus;
  message: string | string[];
  error: string;
};

export const getResponseExceptionMessage = (
  exception: HttpException,
) => {
  if (!(exception instanceof HttpException)) return null;
  const res = exception.getResponse();
  if (!res) return null;
  return isString(res)
    ? res
    : (res as ResponseException)?.message?.toString();
};
