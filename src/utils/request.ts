import express from "express";
import { Account } from "@entities";

export type Request = express.Request & { account?: Account };