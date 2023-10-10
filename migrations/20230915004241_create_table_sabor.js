/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sabor', function (table) {
        table.increments('id').primary(); 
        table.string('descricao');
        table.boolean('ativo');
        
}).createTable('produto', function (table) {
    table.increments('id').primary(); 
    table.integer('qtd_estoque')
    table.integer('volume')
    table.decimal('preco')
    table.integer('sabor_id').unsigned();
    table.foreign('sabor_id').references('sabor.id');
    
}).createTable('cliente', function (table) {
    table.increments('id').primary(); 
    table.string('nome');
    table.string('telefone')
    table.string('cidade');
    table.string('bairro');
    table.string('rua');
}).createTable('carrinho', function (table) {
    table.increments('id').primary(); 
    table.date('data_venda');
    table.decimal('valor_total')
    table.boolean('pago');
    table.integer('cliente_id').unsigned();
    table.foreign('cliente_id').references('cliente.id');
}).createTable('carrinho_itens', function (table) {
    table.integer('qtd_item')
    table.decimal('vlr_total_item');
    table.integer('carrinho_id').unsigned();
    table.integer('produto_id').unsigned();
    table.foreign('carrinho_id').references('carrinho.id');
    table.foreign('produto_id').references('produto.id');
})
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carrinho_itens')
    .dropTableIfExists('carrinho')
    .dropTableIfExists('cliente')
    .dropTableIfExists('produto')
    .dropTableIfExists('sabor');
};
