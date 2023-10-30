use anchor_lang::prelude::*;

declare_id!("H7vC9XffKTzjKcZyEMjmrfynLL1LzgfB8T4L5c6VqFHF");

#[program]
pub mod basic_dapp {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        first_name: String,
        last_name: String,
    ) -> Result<()> {
        let customer: &mut Account<'_, Customer> = &mut ctx.accounts.customer;
        customer.first_name = first_name;
        customer.last_name = last_name;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=signer, space=264)]
    pub customer: Account<'info, Customer>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Customer {
    pub first_name: String,
    pub last_name: String,
}