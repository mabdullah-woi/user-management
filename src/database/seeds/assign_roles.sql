INSERT INTO "join_user_roles" (user_id, role_id)
SELECT u.id, r.id FROM "user" u, "role" r
WHERE (u.email = 'admin@example.com' AND r.name = 'ADMIN')
   OR (u.email = 'tour_agency@example.com' AND r.name = 'TOUR_AGENCY')
   OR (u.email = 'event_agency@example.com' AND r.name = 'EVENT_AGENCY')
   OR (u.email = 'tour_organizer@example.com' AND r.name = 'TOUR_ORGANIZER')
   OR (u.email = 'event_organizer@example.com' AND r.name = 'EVENT_ORGANIZER')
ON CONFLICT DO NOTHING;
