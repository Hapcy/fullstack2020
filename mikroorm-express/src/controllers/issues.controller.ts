import { Router } from 'express';
import { Issue } from '../entities/issue';
import { wrap } from '@mikro-orm/core';

export const issuesRouter = Router();

issuesRouter

  .use((req, res, next) => {
    req.issuesRepository = req.orm.em.getRepository(Issue);
    next();
  })

  // összes lekérdezése
  .get('', async (req, res) => {
    const issues = await req.issuesRepository!.findAll();
    res.send(issues);
  })

  // egy konkrét lekérdezése
  // .get(':id', () => {})

  // új létrehozása
  .post('', async (req, res) => {
    // Létrehozok egy issue osztályba tartozó objektumot
    const issue = new Issue();

    // Mikroorm-mel adok neki néhány segédmetódust
    const wrappedIssue = wrap(issue);

    // a request összes issueban is megtalálható propertyjét besettelem az objektumba
    wrappedIssue.assign(req.body);

    // lementi és beküldi a db-be
    await req.issuesRepository?.persistAndFlush(issue);

    res.send(issue);
  });
