#!/usr/bin/env node

import { program } from "./command";

require("dotenv").config();

program.parse();
