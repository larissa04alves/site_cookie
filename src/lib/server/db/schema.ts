import {
	pgTable,
	serial,
	text,
	varchar,
	integer,
	numeric,
	boolean,
	timestamp,
	date
} from 'drizzle-orm/pg-core';

// Tabela unificada 'user'
export const user = pgTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	provider: varchar('provider', { length: 50 }).notNull(),
	providerUserId: text('provider_user_id').notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	avatarUrl: text('avatar_url'),
	admin: boolean('admin').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

// Tabela 'session' com referência atualizada
export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// Outras tabelas permanecem inalteradas
export const promocao = pgTable('promocao', {
	codigo: serial('codigo').primaryKey(),
	nome: varchar('nome', { length: 255 }).notNull(),
	valor: numeric('valor', { precision: 10, scale: 2 }).notNull(),
	estoque: integer('estoque').notNull(),
	descricao: text('descricao').notNull(),
	dataInicio: date('data_inicio').notNull(),
	dataFim: date('data_fim').notNull(),
	arquivo: text('arquivo').notNull()
});

export const produto = pgTable('produto', {
	codigo: serial('codigo').primaryKey(),
	nome: varchar('nome', { length: 100 }),
	valor: numeric('valor', { precision: 10, scale: 2 }),
	estoque: integer('estoque'),
	descricao: text('descricao'),
	status: boolean('status'),
	arquivo: text('arquivo')
});

export const pedido = pgTable('pedido', {
	id: serial('id').primaryKey(),
	data: date('data').notNull(),
	clienteId: integer('cliente_id')
		.notNull()
		.references(() => cliente.id),
	enderecoEntrega: text('endereco_entrega').notNull(),
	valor: numeric('valor', { precision: 10, scale: 2 }).notNull(),
	frete: numeric('frete', { precision: 10, scale: 2 }).default('0'),
	desconto: numeric('desconto', { precision: 10, scale: 2 }).default('0'),
	valorTotal: numeric('valor_total', { precision: 10, scale: 2 }).notNull()
});

export const pedidoItem = pgTable('pedido_item', {
	id: serial('id').primaryKey(),
	pedidoId: integer('pedido_id')
		.notNull()
		.references(() => pedido.id),
	produtoId: integer('produto_id')
		.notNull()
		.references(() => produto.codigo),
	valor: numeric('valor', { precision: 10, scale: 2 }).notNull(),
	desconto: numeric('desconto', { precision: 10, scale: 2 }).default('0'),
	quantidade: integer('quantidade').notNull(),
	valorTotal: numeric('valor_total', { precision: 10, scale: 2 }).notNull()
});

export const cliente = pgTable('cliente', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 255 }).notNull(),
	documento: varchar('documento', { length: 50 }).notNull().unique(),
	dataNascimento: date('data_nascimento'),
	email: varchar('email', { length: 255 }).notNull().unique(),
	senha: text('senha').notNull()
});

export const enderecoCliente = pgTable('endereco_cliente', {
	id: serial('id').primaryKey(),
	clienteId: integer('cliente_id')
		.notNull()
		.references(() => cliente.id),
	titulo: varchar('titulo', { length: 50 }),
	pais: varchar('pais', { length: 100 }),
	cep: varchar('cep', { length: 20 }),
	estado: varchar('estado', { length: 100 }),
	cidade: varchar('cidade', { length: 100 }),
	bairro: varchar('bairro', { length: 100 }),
	endereco: varchar('endereco', { length: 255 }),
	numero: varchar('numero', { length: 20 }),
	complemento: varchar('complemento', { length: 100 })
});

// Exportação dos tipos inferidos
export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;

// Para Promocao, defina tipos separados
export type PromocaoSelect = typeof promocao.$inferSelect;
export type PromocaoInsert = typeof promocao.$inferInsert;

// Faça o mesmo para Produto, se necessário
export type ProdutoSelect = typeof produto.$inferSelect;
export type ProdutoInsert = typeof produto.$inferInsert;

// ------------
export type Pedido = typeof pedido.$inferSelect;
export type PedidoItem = typeof pedidoItem.$inferSelect;
export type Cliente = typeof cliente.$inferSelect;
export type EnderecoCliente = typeof enderecoCliente.$inferSelect;
