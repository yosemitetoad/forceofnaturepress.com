-- Add newsletter to contact_cards and establish canonical order
UPDATE page_content
SET value = '[{"key":"email","description":"For wholesale inquiries, freelance opportunities, collabs, projects, or anything else."},{"key":"newsletter","description":"Sign up for Field Notes from Force of Nature Press and get a free digital field guide + updates on new art, shop drops, and more."},{"key":"instagram","description":"Behind-the-scenes, new releases, and nature photography."},{"key":"pinterest","description":"Nature inspiration boards and artwork collections."},{"key":"etsy","description":"For questions regarding Etsy orders, please message me on Etsy instead of emailing or filling out the contact form!"}]'
WHERE key = 'contact_cards';
