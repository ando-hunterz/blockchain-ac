#! /home/andodo/blockchain-ac/node/node-env/bin/python3

from web3 import Web3
import json
import asyncio


w3 = Web3(Web3.HTTPProvider('http://192.168.0.19:7545'))

json_abi = open('./contracts/UserToken.sol/UserToken.json')

abi = json.load(json_abi)

user_contract = w3.eth.contract(
    address='0xd0E6077CC6aAbC3A46b7772fceF372D6D476c008', abi=abi['abi'])


def handle_event(event):
    print(event)


async def log_loop(event_filter, poll_interval):
    while True:
        for event in event_filter.get_new_entries():
            handle_event(event)
        await asyncio.sleep(poll_interval)


user_mint_filter = user_contract.events.userMint.createFilter(
    fromBlock="latest")

loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(
        asyncio.gather(
            log_loop(user_mint_filter, 2),
        ))
finally:
    loop.close()
